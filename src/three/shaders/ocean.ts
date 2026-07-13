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

  uniform vec3 uShallowColor;
  uniform vec3 uDeepColor;
  uniform vec3 uFoamColor;
  uniform vec3 uSkyColor;
  uniform vec3 uSunColor;
  uniform vec3 uSunDirection;
  uniform vec3 uCameraPosition;
  uniform float uTime;
  uniform float uFoamThreshold;
  uniform float uSparkle;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying float vElevation;

  // Cheap hash-based sparkle noise.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);

    // Fresnel — more reflective (sky-tinted) at grazing angles.
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

    // Depth/elevation blend: crests read shallower/turquoise, troughs deep blue.
    float depthMix = smoothstep(-1.0, 1.0, vElevation);
    vec3 waterColor = mix(uDeepColor, uShallowColor, depthMix);

    // Blend toward sky reflection via fresnel.
    vec3 color = mix(waterColor, uSkyColor, fresnel * 0.6);

    // Sun specular glint (Blinn-Phong, tight highlight).
    vec3 halfVec = normalize(viewDir + normalize(uSunDirection));
    float spec = pow(max(dot(normal, halfVec), 0.0), 220.0);
    color += uSunColor * spec * 1.4;

    // Foam on the highest crests.
    float foam = smoothstep(uFoamThreshold, uFoamThreshold + 0.25, vElevation);
    color = mix(color, uFoamColor, foam * 0.6);

    // Faint drifting sparkle on the surface.
    float sparkle = step(0.9992, hash(floor(vWorldPosition.xz * 12.0) + floor(uTime * 3.0)));
    color += uSunColor * sparkle * uSparkle;

    gl_FragColor = vec4(color, 0.92);
    #include <colorspace_fragment>
  }
`;
