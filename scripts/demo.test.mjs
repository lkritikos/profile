import { describe, expect, it } from 'vitest';
import { colorizeUrl, opener, previewUrl, sanitizeAlias } from './demo.mjs';

describe('sanitizeAlias', () => {
  it('lowercases and turns invalid chars into single dashes', () => {
    expect(sanitizeAlias('ci/Split_Deploy')).toBe('ci-split-deploy');
  });
  it('collapses and trims dashes', () => {
    expect(sanitizeAlias('feat--X--')).toBe('feat-x');
  });
  it('truncates to 63 chars with no trailing dash', () => {
    const out = sanitizeAlias('a'.repeat(80));
    expect(out.length).toBe(63);
    expect(out.endsWith('-')).toBe(false);
  });
});

describe('previewUrl', () => {
  it('builds the deterministic workers.dev URL', () => {
    expect(previewUrl('my-branch')).toBe('https://my-branch-profile.lkritikos.workers.dev');
  });
});

describe('opener', () => {
  it('picks the opener per platform', () => {
    expect(opener('darwin').cmd).toBe('open');
    expect(opener('linux').cmd).toBe('xdg-open');
    expect(opener('win32').cmd).toBe('cmd');
  });
});

describe('colorizeUrl', () => {
  it('wraps in ANSI on a TTY with color allowed', () => {
    expect(colorizeUrl('u', { isTTY: true, noColor: false })).toContain('[36m');
  });
  it('stays plain when not a TTY', () => {
    expect(colorizeUrl('u', { isTTY: false, noColor: false })).toBe('u');
  });
  it('stays plain when NO_COLOR is set', () => {
    expect(colorizeUrl('u', { isTTY: true, noColor: true })).toBe('u');
  });
});
