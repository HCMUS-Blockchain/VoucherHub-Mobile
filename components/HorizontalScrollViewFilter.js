import { ScrollView, VStack, Box } from "native-base";
import React from "react";
import filterItem from "../contants/filter";
import Item from "./FilterItem";

const HorizontalScrollViewFilter = () => {
  return (
    <Box h="12" w="100%" mt="-6">
      <ScrollView w="100%" horizontal={true}>
        <VStack flex="1" direction="row" h="12">
          {filterItem.map((key, index) => {
            return (
              <Item
                key={key.title}
                bgColor={key.bgColor}
                title={key.title}
                iconName={key.iconName}
              />
            );
          })}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default HorizontalScrollViewFilter;
