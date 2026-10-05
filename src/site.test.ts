import { describe, expect, it } from 'vitest';
import { detectOs } from './site';

describe('detectOs', () => {
  it('reconnaît Windows, macOS et Linux', () => {
    expect(detectOs('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36')).toBe('windows');
    expect(detectOs('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15')).toBe('macos');
    expect(detectOs('Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0')).toBe('linux');
  });

  it('propose Windows sur mobile et pour un système inconnu', () => {
    expect(detectOs('Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Mobile')).toBe('windows');
    expect(detectOs('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15')).toBe('windows');
    expect(detectOs('')).toBe('windows');
  });
});
