import { getAuthority } from './authority';
describe('getAuthority should be strong', () => {
  it('string', () => {
    expect(getAuthority('ADMIN')).toEqual(['ADMIN']);
  });
  it('array with double quotes', () => {
    expect(getAuthority('"ADMIN"')).toEqual(['ADMIN']);
  });
  it('array with single item', () => {
    expect(getAuthority('["ADMIN"]')).toEqual(['ADMIN']);
  });
  it('array with multiple items', () => {
    expect(getAuthority('["ADMIN", "guest"]')).toEqual(['ADMIN', 'guest']);
  });
});
