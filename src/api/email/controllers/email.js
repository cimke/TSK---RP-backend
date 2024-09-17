'use strict';

/**
 * email controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::email.email', ({ strapi }) => ({
    async create(ctx) {
      const { email }  = ctx.request.body.data;
      console.log('email', email)

      const existingEmail = await strapi.entityService.findMany('api::email.email', {
        filters: { email },
      });
  
      if (existingEmail.length > 0) {
        return ctx.badRequest('Email already exists', {
            id: 'email.exists',
            humanReadable: 'This email already exists',
          });
      }

      // random code
      const generateRandomCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
      };

      let code;
      let isCodeUnique = false;

      while (!isCodeUnique) {
        code = generateRandomCode();

        const existingCode = await strapi.entityService.findMany('api::email.email', {
          filters: { referral_code: code },
        });

        if (existingCode.length === 0) {
          isCodeUnique = true;
        }
      }

      ctx.request.body.data.referral_code = code;

      const response = await super.create(ctx);
      
      return { referral_code: response.data.attributes.referral_code };
    },
}));
