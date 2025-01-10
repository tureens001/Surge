import { describe, it } from 'mocha';

import { isDomainAlive, noWhois } from './is-domain-alive';
import { expect } from 'expect';

import process from 'node:process';

describe('whoisExists', () => {
  it('.cryptocrawler.io', () => {
    expect(noWhois({
      'whois.nic.io': {
        'Domain Status': [],
        'Name Server': [],
        '>>> Last update of WHOIS database': '2025-01-05T11:06:38Z <<<',
        text: [
          'Domain not found.',
          '',
          'Terms of Use: Access to WHOIS'
        ]
      }
    })).toBe('Domain not found.');
  });

  it('.tunevideo.ru', () => {
    expect(noWhois({
      'whois.tcinet.ru': {
        'Domain Status': [],
        'Name Server': [],
        text: [
          '% TCI Whois Service. Terms of use:',
          '% https://tcinet.ru/documents/whois_ru_rf.pdf (in Russian)',
          '% https://tcinet.ru/documents/whois_su.pdf (in Russian)',
          '',
          'No entries found for the selected source(s).',
          '',
          'Last updated on 2025-01-05T11:03:01Z'
        ]
      }
    })).toBe('No entries found for the selected source(s).');
  });

  it('nosuchpool.cl', () => {
    expect(noWhois({
      'whois.nic.cl': {
        'Domain Status': [],
        'Name Server': [],
        'nosuchpool.cl': 'no entries found.',
        text: [
          '%%',
          '%% This is the NIC Chile Whois server (whois.nic.cl).',
          '%%',
          '%% Rights restricted by copyright.',
          '%% See https://www.nic.cl/normativa/politica-publicacion-de-datos-cl.pdf',
          '%%'
        ]
      }
    })).toBe('nosuchpool.cl: no entries found.');
  });

  it('whois.domain-registry.nl', () => {
    expect(noWhois({
      'whois.domain-registry.nl': {
        'Domain Status': [],
        'Name Server': [],
        text: [
          'spookyplanet.nl is free'
        ]
      }
    })).toBe('spookyplanet.nl is free');
  });
});

describe('isDomainAlive', function () {
  this.timeout(10000);

  // it('.cryptocrawler.io', async () => {
  //   expect((await isDomainAlive('.cryptocrawler.io', true))[1]).toEqual(false);
  // });

  // it('.tunevideo.ru', async () => {
  //   expect((await isDomainAlive('.tunevideo.ru', true))[1]).toEqual(false);
  // });

  // it('.myqloud.com', async () => {
  //   expect((await isDomainAlive('.myqloud.com', true))[1]).toEqual(true);
  // });

  // it('discount-deal.org', async () => {
  //   expect((await isDomainAlive('discount-deal.org', false))[1]).toEqual(false);
  // });

  // it('ithome.com.tw', async () => {
  //   expect((await isDomainAlive('ithome.com.tw', false))[1]).toEqual(true);
  // });

  // it('flipkart.com', async () => {
  //   expect((await isDomainAlive('flipkart.com', false))[1]).toEqual(true);
  // });

  // it('lzzyimg.com', async () => {
  //   expect((await isDomainAlive('.lzzyimg.com', true))[1]).toEqual(true);
  // });

  // it('tayfundogdas.me', async () => {
  //   expect((await isDomainAlive('.tayfundogdas.me', true))[1]).toEqual(true);
  // });

  it('spookyplanet.nl', async () => {
    process.env.DEBUG = 'true';
    expect((await isDomainAlive('.spookyplanet.nl', true))[1]).toEqual(false);
  });
});
