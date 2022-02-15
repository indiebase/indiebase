import { req } from '../req';
import axios from 'axios';

interface FetchPossessionTreeParams {
  id: number;
  showLeaf?: number;
  [k: string]: any;
}

export interface PossessionFormData {
  id?: number;

  name: string;

  comment?: string;

  path?: string;

  pid?: number;

  type?: number;

  disable?: boolean;

  gravity: number;

  createTime?: Date;

  updateTime?: Date;

  [k: string]: any;
}

export const PossessionType = {
  1: '菜单',
  2: '叶子',
};

export const fetchPossessionTree = async function (
  params: FetchPossessionTreeParams,
) {
  const { data } = await req.get('/v1/possession/tree', { params });
  return data;
};

export const createPossessionReq = async function (params: PossessionFormData) {
  const { data } = await req.post('/v1/possession/create', params);
  return data;
};

export const updatePossessionReq = async function (params: PossessionFormData) {
  const { data } = await req.put('/v1/possession/update', params);
  return data;
};

export const deletePossessionReq = async function (
  params: FetchPossessionTreeParams,
) {
  const { data } = await req.delete('/v1/possession/delete', { data: params });
  return data;
};
