"use client";

import React, { useEffect, useState } from "react";
import { Item } from "../components/Item";
import { GET_CATEGORIS } from "@/app/api/GraphQl/categoris";
import { fetchDataPage } from "@/lib/getData";

export const Categoris = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchDataPage(GET_CATEGORIS, "trangChu");
        const categoryItems = data?.cacNganhDaoTao?.item || [];

        const formattedCategories = categoryItems.map((item: any) => ({
          path: item.list.tenNganh,
          title: item.list.tenNganh,
          image: item.list.anhNganh?.node?.mediaItemUrl || "",
          description: item.list.gioiThieu
        }));

        setCategories(formattedCategories);

        // Add 3-second delay before showing content
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {categories.map((cat, index) => (
        <Item key={index} path={cat.path} title={cat.title} image={cat.image} />
      ))}
    </>
  );
};
