import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = function () {
  const h = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            // h.goBack();
          }}
        >
          返回
        </Button>
      }
    />
  );
};
