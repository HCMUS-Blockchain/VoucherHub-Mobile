import {Box, ScrollView, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import Item from "./FilterItem";
import {getAll} from "../api/category";
import Loader from "./Loader";

const HorizontalScrollViewFilter = (props) =>{
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getListCategories().then((res) => {
            setLoading(false);
            setCategories(res.categories);
        })
    }, []);
    const getListCategories = async () => {
        setLoading(true);
        try {
            const categories = await getAll()
            return categories.data
        } catch (e) {
            setLoading(false);
            return []
        }
    }
  return (
    <Box h="12" w="100%" mt="-6">
        <Loader loading={loading}/>
      <ScrollView
        w="100%"
        horizontal={true}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex="1" direction="row" h="12">
            {categories&&categories.map((key, index) => {
                return (
                    <Item
                        key={key.name}
                        bgColor={key.color}
                        title={key.name}
                        iconName={key.iconName}
                        setData={props.setData}
                        setLoading={setLoading}
                    />
                );})}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HorizontalScrollViewFilter;
