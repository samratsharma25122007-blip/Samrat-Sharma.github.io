/**
 * Ocean shader (PRD Parts 3 & 11.5) — a custom GLSL water material.
 *
 * Vertex: three summed Gerstner waves displace the surface and produce an
 * analytic normal (no normal map needed for the base motion). Fragment: a
 * depth/fresnel blend from turquoise shore to deep ocean blue, a sharp sun
 * glint, foam on wave crests and a faint sparkle — all tuned to the tropical
 * luxury art direction (no neon, physically believable).
 *
 * Exported as strings so the material stays in TypeScript (type-safe) while
 * still being authored as real GLSL.
 */

export const oceanVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWaveSpeed;
  uniform float uAmplitude;
  // Each wave: xy = direction, z = steepness, w = wavelength.
  uniform vec4 uWaveA;
  uniform vec4 uWaveB;
  uniform vec4 uWaveC;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vElevation;

  // Single Gerstner wave contribution; accumulates tangent/binormal for normals.
  vec3 gerstner(vec4 wave, vec3 pos, inout vec3 tangent, inout vec3 binormal) {
    vec2 dir = normalize(wave.xy);
    float steepness = wave.z;
    float wavelength = wave.w;

    float k = 6.28318530718 / wavelength;      // 2*PI / wavelength
    float c = sqrt(9.8 / k);                   // phase speed
    float f = k * (dot(dir, pos.xz) - c * uTime * uWaveSpeed);
    float a = (steepness / k) * uAmplitude;

    tangent += vec3(
      -dir.x * dir.x * steepness * sin(f),
      dir.x * steepness * cos(f),
      -dir.x * dir.y * steepness * sin(f)
    );
    binormal += vec3(
      -dir.x * dir.y * steepness * sin(f),
      dir.y * steepness * cos(f),
      -dir.y * dir.y * steepness * sin(f)
    );

    return vec3(dir.x * a * cos(f), a * sin(f), dir.y * a * cos(f));
  }

  void main() {
    vec3 pos = position;
    vec3 tangent = vec3(1.0, 0.0, 0.0);
    vec3 binormal = vec3(0.0, 0.0, 1.0);
    vec3 displacement = vec3(0.0);

    displacement += gerstner(uWaveA, pos, tangent, binormal);
    displacement += gerstner(uWaveB, pos, tangent, binormal);
    displacement += gerstner(uWaveC, pos, tangent, binormal);

    pos += displacement;
    vElevation = displacement.y;

    vec3 normal = normalize(cross(binormal, tangent));
    vNormal = normalize(mat3(modelMatrix) * normal);

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const oceanFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uShallowColor;   // bright crystal cyan (lagoon)
  uniform vec3 uMidColor;       // turquoise
  uniform vec3 uDeepColor;      // deep ocean blue
  uniform vec3 uFoamColor;
  uniform vec3 uSkyColor;
  uniform vec3 uSunColor;
  uniform vec3 uSunDirection;
  uniform vec3 uCameraPosition;
  uniform float uTime;
  uniform float uFoamThreshold;
  uniform float uSparkle;
  uniform float uLagoonRadius;  // radius of the bright shallow lagoon

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vElevation;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Animated caustic banding for the shallow lagoon.
  float caustics(vec2 p, float t) {
    float c = 0.0;
    c += sin(p.x * 3.0 + t * 1.2) * sin(p.y * 3.0 - t);
    c += sin(p.x * 6.0 - t) * sin(p.y * 5.0 + t * 1.3) * 0.5;
    return pow(max(c * 0.5 + 0.5, 0.0), 2.0);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);

    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

    // Radial shallow->deep gradient: bright turquoise lagoon near the centre,
    // deepening to ocean blue outward (matches the concept artwork).
    float dist = length(vWorldPosition.xz);
    float shallow = 1.0 - smoothstep(0.0, uLagoonRadius, dist);
    float mid = 1.0 - smoothstep(uLagoonRadius, uLagoonRadius * 3.0, dist);

    vec3 waterColor = uDeepColor;
    waterColor = mix(waterColor, uMidColor, mid);
    waterColor = mix(waterColor, uShallowColor, shallow);

    // Crest lightening from wave elevation.
    waterColor = mix(waterColor, uShallowColor, smoothstep(0.0, 1.2, vElevation) * 0.25);

    // Sky reflection via fresnel.
    vec3 color = mix(waterColor, uSkyColor, fresnel * 0.4);

    // Caustics visible mostly in the shallow lagoon.
    float caus = caustics(vWorldPosition.xz * 0.5, uTime) * shallow;
    color += uShallowColor * caus * 0.2;

    // Sun specular glint (tight Blinn-Phong highlight), softened.
    vec3 halfVec = normalize(viewDir + normalize(uSunDirection));
    float spec = pow(max(dot(normal, halfVec), 0.0), 200.0);
    color += uSunColor * spec * 0.7;

    // Foam on the highest crests.
    float foam = smoothstep(uFoamThreshold, uFoamThreshold + 0.22, vElevation);
    color = mix(color, uFoamColor, foam * 0.5);

    // Faint drifting sparkle.
    float sparkle = step(0.9992, hash(floor(vWorldPosition.xz * 12.0) + floor(uTime * 3.0)));
    color += uSunColor * sparkle * uSparkle;

    gl_FragColor = vec4(color, 0.96);
    #include <colorspace_fragment>
  }
`;
