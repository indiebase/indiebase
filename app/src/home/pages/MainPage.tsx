import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainPage: FC<any> = function () {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate('dashboard');
        }}
      >
        Demo
      </Button>
      <Button
        onClick={() => {
          navigate('demo', { replace: true });
        }}
      >
        Demo
      </Button>
    </div>
  );
};
