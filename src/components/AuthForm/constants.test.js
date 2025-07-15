import { describe, it, expect } from 'vitest';
import {
  AUTH_TYPES,
  authViewConfig,
  getAuthViewConfigByAuthType,
} from './constants';

describe('AuthForm', () => {
  describe('authViewConfig', () => {
    it('should define LOGIN and SIGNUP types', () => {
      expect(AUTH_TYPES).toEqual({
        LOGIN: 'login',
        SIGNUP: 'signup',
      });
    });

    it('should contain config for login and signup', () => {
      expect(authViewConfig).toHaveProperty('login');
      expect(authViewConfig).toHaveProperty('signup');
    });

    it('should have all required fields for login', () => {
      const config = authViewConfig.login;
        
      expect(config).toMatchObject({
        btnLabel: expect.any(String),
        passwordAutoComplete: expect.any(String),
        passwordDescription: expect.any(String),
        changeAuthTypeLabel: expect.any(String),
        changeAuthTypeDescription: expect.any(String),
      });
    });

    it('should have all required fields for signup', () => {
      const config = authViewConfig.signup;
      expect(config).toMatchObject({
        btnLabel: expect.any(String),
        passwordAutoComplete: expect.any(String),
        passwordDescription: expect.any(String),
        changeAuthTypeLabel: expect.any(String),
        changeAuthTypeDescription: expect.any(String),
      });
    });
  });

  describe('getOptionsByAuthType', () => {
    it('should return login config for type "login"', () => {
      const result = getAuthViewConfigByAuthType('login');
      expect(result).toEqual(authViewConfig.login);
    });

    it('should return signup config for type "signup"', () => {
      const result = getAuthViewConfigByAuthType('signup');
      expect(result).toEqual(authViewConfig.signup);
    });

    it('should fallback to login config for unknown type', () => {
      const result = getAuthViewConfigByAuthType('invalid_type');
      expect(result).toEqual(authViewConfig.login);
    });
  });
});

