/**
 * Sky shader (PRD Part 11.5) — a bright azure gradient with a soft warm horizon,
 * a gentle sun glow and minimal, slowly drifting clouds. No dramatic sunsets,
 * no dark skies: a tropical island at 8:30 AM.
 *
 * Rendered on the inside of a large sphere (BackSide).
 */

export const skyVertexShader = /* glsl */ `
  varying vec3 vWorldDirection;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldDirection = normalize(worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const skyFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uZenithColor;
  uniform vec3 uHorizonColor;
  uniform vec3 uSunColor;
  uniform vec3 uSunDirection;
  uniform float uTime;
  uniform float uCloudDensity;

  varying vec3 vWorldDirection;

  // Value noise + fbm for soft cloud bands.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      total += noise(p) * amp;
      p *= 2.0;
      amp *= 0.5;
    }
    return total;
  }

  void main() {
    vec3 dir = normalize(vWorldDirection);
    float h = clamp(dir.y, 0.0, 1.0);

    // Vertical gradient: warm sand horizon → bright azure zenith.
    vec3 sky = mix(uHorizonColor, uZenithColor, pow(h, 0.55));

    // Soft sun glow around the sun direction.
    float sunDot = max(dot(dir, normalize(uSunDirection)), 0.0);
    float glow = pow(sunDot, 8.0) * 0.6 + pow(sunDot, 220.0);
    sky += uSunColor * glow;

    // Minimal drifting clouds near the horizon band only.
    float band = smoothstep(0.6, 0.0, dir.y) * smoothstep(-0.05, 0.15, dir.y);
    vec2 cloudUv = dir.xz / max(dir.y + 0.35, 0.2);
    float clouds = fbm(cloudUv * 2.5 + vec2(uTime * 0.01, 0.0));
    clouds = smoothstep(0.55, 0.8, clouds) * band * uCloudDensity;
    sky = mix(sky, vec3(1.0), clouds * 0.5);

    gl_FragColor = vec4(sky, 1.0);
    #include <colorspace_fragment>
  }
`;
