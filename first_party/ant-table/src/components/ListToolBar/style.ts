﻿import type { GenerateStyle, ProAliasToken } from '@letscollab/ant-utils';
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';

export interface ProListToken extends ProAliasToken {
  componentCls: string;
}

const genProListStyle: GenerateStyle<ProListToken> = (token) => {
  return {
    [token.componentCls]: {
      lineHeight: '1',
      '&-container': {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBlock: token.padding,
        paddingInline: 0,
        '&-mobile': { flexDirection: 'column' },
      },
      '&-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: token.colorTextHeading,
        fontWeight: '500',
        fontSize: token.fontSizeLG,
      },
      '&-search:not(:last-child)': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      '&-setting-item': {
        marginBlock: 0,
        marginInline: 4,
        color: token.colorIconHover,
        fontSize: token.fontSizeLG,
        cursor: 'pointer',
        '> span': { display: 'block', width: '100%', height: '100%' },
        '&:hover': {
          color: token.colorPrimary,
        },
      },
      '&-left': {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
        justifyContent: 'flex-start',
        maxWidth: 'calc(100% - 200px)',
        [`${token.antCls}-tabs`]: {
          width: '100%',
        },
      },
      '&-right': {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: 8,
      },
      '&-extra-line': { marginBlockEnd: token.margin },
      '&-setting-items': {
        display: 'flex',
        gap: 8,
        lineHeight: '32px',
        alignItems: 'center',
      },
      '&-filter': {
        '&:not(:last-child)': { marginInlineEnd: token.margin },
        display: 'flex',
        alignItems: 'center',
        [`div.$${token.antCls}-pro-table-search`]: {
          marginBlock: 0,
          marginInline: 0,
          paddingBlock: 0,
          paddingInline: 0,
        },
      },
      '&-inline-menu-item': {
        display: 'inline-block',
        marginInlineEnd: token.marginLG,
        cursor: 'pointer',
        opacity: '0.75',
        '&-active': { fontWeight: 'bold', opacity: '1' },
      },
      [`${token.antCls}-tabs-top > ${token.antCls}-tabs-nav`]: {
        marginBlockEnd: 0,
        '&::before': { borderBlockEnd: 0 },
        [`${token.antCls}-tabs-nav-list`]: {
          marginBlockStart: 0,
          '${token.antCls}-tabs-tab': {
            paddingBlockStart: 0,
          },
        },
      },
      '&-dropdownmenu-label': {
        fontWeight: 'bold',
        fontSize: token.fontSizeIcon,
        textAlign: 'center',
        cursor: 'pointer',
      },
      '@media (max-width: 768px)': {
        [token.componentCls]: {
          '&-container': {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
          },
          '&-left': { marginBlockEnd: '16px', maxWidth: '100%' },
        },
      },
    },
  };
};

export function useStyle(prefixCls: string) {
  return useAntdStyle('ProTableListToolBar', (token) => {
    const proListToken: ProListToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProListStyle(proListToken)];
  });
}
