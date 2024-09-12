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
  
      const response = await super.create(ctx);
      return response;
    },
}));
