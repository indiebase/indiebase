import { Button } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextParticle } from 'city-night';

export const MainPage: FC<any> = function () {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        控制台
      </Button>
      <TextParticle text="letscollab" resolution={5} />
    </div>
  );
};
