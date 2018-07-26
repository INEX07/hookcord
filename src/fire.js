const snekfetch = require('snekfetch');
const util = require('./util');
/**
 * A function that fires Webhooks. Basically the function version of {@link Base}.
 * @name Fire
 * @param {string} Link - The details or link the Webhook will fire to.
 * @param {WebhookOptions} [Options] - Custom options.
 * @param {WebhookJSON} Payload - The payload that will be fired to the link.
 * @returns {Response}
 */
var Fire = async function(link, opts = {}, payload) {
  if (!payload) {
    throw new Error('Payload has not been provided.');
  }
  if (!(link || opts.link)) {
    throw new Error('Link has not been provided.');
  }
  if (link.split('/').length === 2) {
    link = 'https://discordapp.com/api/webhooks/' + link;
  }
  var res;
  try {
    res = await snekfetch.post(link || opts.link)
      .send(payload);
  } catch (e) {
    res = e;
    if (e.statusCode !== 429 && !opts._statcode) {
      throw new Error(e.statusCode);
    }
  }
  if (opts._statcode) {
    res.statusCode = opts._statcode;
  }
  if (res.statusCode === 429) {
    res._utiloutput = util.handleRatelimit(opts.handler, res);
  }
  res.linkurl = link;
  return res;
};

module.exports = Fire;