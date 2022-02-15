import { Carousel } from 'antd';
import React, { FC } from 'react';
import './Swiper.css';

const mockImages = [
  'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/0B/07/ChMkJ1Zg-cOIahgIAAOA-yAgtcwAAFtJgM_qg8AA4ET940.jpg',
  'https://desk-fd.zol-img.com.cn/t_s1600x900c5/g4/M01/04/09/Cg-4y1TthaKILoSaACCX4-br1qAAAVgtQHS6Z0AIJf7476.jpg',
  'https://desk-fd.zol-img.com.cn/t_s1680x1050c5/g5/M00/01/0E/ChMkJlbKwX2ILH5HAATyd6Y0F60AALGZAG0hnMABPKP934.jpg',
];

export const Swiper: FC<any> = function (props) {
  return (
    <Carousel autoplay>
      {mockImages.map((src, i) => {
        return (
          <div key={src + i}>
            <div
              className="home-swiper-wrapper"
              style={{
                background: `no-repeat center/cover url(${src})`,
              }}
            />
          </div>
        );
      })}
    </Carousel>
  );
};
