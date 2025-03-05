import { StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'
import ProductsHeader from './ProductsHeader';
import ProductsContent from './ProductsContent';
import ProductsFooter from './ProductsFooter';
import useTheme from '../../../../Services/useTheme';
import useData from '../../../../Shared/Stage/useData';

const Products = ({ navigation,searchRef }) => {

  const colors = useTheme();
  const products = useData((state) => state.products);
  const setProducts = useData((state) => state.setProducts);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ width: '100%', height: 60, backgroundColor: colors.primary_3 }}>
        <ProductsHeader searchRef={searchRef} products={products} setProducts={setProducts} />
      </View>
      <View style={{ flex: 1, }}>
        <ProductsContent searchRef={searchRef} data={products} setData={setProducts} />
      </View>
      <View style={{ width: '100%', height: 50 }}>
        <ProductsFooter searchRef={searchRef} navigation={navigation} />
      </View>
    </View>
  )
}

export default Products

const styles = StyleSheet.create({})

