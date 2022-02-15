import { req } from './req';

export interface BannerFormData {
  id: number;
  title: string;
  subtitle?: string;
  imgUri?: string;
  desc?: string;
  href?: string;
  disable?: boolean;
}

export const queryBanners = async function () {
  return req.get('/v1/dash/banner/query');
};

export const fetchActiveBanners = async function () {
  return req.post('/v1/site/banner/list');
};

export const createBanner = async function (body: Partial<BannerFormData>) {
  return req.post('/v1/dash/banner/create', body);
};

export const updateBanner = async function (body: Partial<BannerFormData>) {
  return req.post('/v1/dash/banner/update', body);
};

export const deleteBanner = async function (body: Pick<BannerFormData, 'id'>) {
  return req.post('/v1/dash/banner/delete', body);
};
