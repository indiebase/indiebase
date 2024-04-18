/**
 * https://github.com/felixmosh/knex-paginate
 * SPDX-License-Identifier: MIT
 */

import knex from 'knex';

function paginate(
  this,
  { pageSize = 10, pageIndex = 1, isFromStart = false, isLengthAware = false },
) {
  if (isNaN(pageSize)) {
    throw new Error('Paginate error: pageSize must be a number.');
  }

  if (isNaN(pageIndex)) {
    throw new Error('Paginate error: pageIndex must be a number.');
  }

  if (typeof isFromStart !== 'boolean') {
    throw new Error('Paginate error: isFromStart must be a boolean.');
  }

  if (typeof isLengthAware !== 'boolean') {
    throw new Error('Paginate error: isLengthAware must be a boolean.');
  }

  const shouldFetchTotals = isLengthAware || pageIndex === 1 || isFromStart;
  let pagination = {};
  let countQuery: any = null;

  if (pageIndex < 1) {
    pageIndex = 1;
  }

  const offset = isFromStart ? 0 : (pageIndex - 1) * pageSize;
  const limit = isFromStart ? pageSize * pageIndex : pageSize;

  const postProcessResponse =
    typeof this.client.config.postProcessResponse === 'function'
      ? this.client.config.postProcessResponse
      : function (key) {
          return key;
        };

  if (shouldFetchTotals) {
    countQuery = new this.constructor(this.client)
      .count('* as total')
      .from(this.clone().offset(0).clearOrder().as('count__query__'))
      .first()
      .debug(this._debug);
  }

  // This will paginate the data itself
  this.offset(offset).limit(limit);

  return this.client.transaction(async (trx) => {
    const result = await this.transacting(trx);

    if (shouldFetchTotals) {
      const countResult = await countQuery.transacting(trx);
      const total = +(countResult.TOTAL || countResult.total || 0);
      const lastPage = Math.ceil(total / pageSize);
      pagination = {
        total,
        lastPage,
        prevPage: pageIndex > 1 ? pageIndex - 1 : null,
        nextPage: pageIndex < lastPage ? pageIndex + 1 : null,
      };
    }

    // Add pagination data to paginator object
    pagination = postProcessResponse({
      ...pagination,
      pageSize,
      pageIndex,
      from: offset,
      to: offset + result.length,
    });

    return { data: result, pagination };
  });
}

knex.QueryBuilder.extend('paginate', paginate);
