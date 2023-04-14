import axios, { AxiosResponse } from "axios";
import { EventItem } from "@/app/api/models/event";
import { BaseModel } from "@/app/api/models/baseModel";
import getConfig from "next/config";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  method: "GET",
});

export const getEvents = async (
  page: number = 0
): Promise<AxiosResponse<BaseModel<EventItem[]>>> =>
  baseClient.request<BaseModel<EventItem[]>>({
    url: "/events/GetEvents",
    params: {
      page,
    },
  });
