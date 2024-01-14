import {
    setSearchEquipmentTitle,
    setEquipments,
    setLoading,
    setMinPrice,
    setMaxPrice,
} from '../slices/equipmentSlice';
  
import { getEquipments } from '../modules/get-modelings';
import { setDraftId } from '../slices/bucketSlice';
  
const filterEquipments = (
    data,
    searchEquipmentTitle,
    minPrice,
    maxPrice,
) => {
    const filteredData = data.filter((model) => {
      const modelNameMatches = model.modeling_name.toLowerCase().includes(searchValue.toLowerCase());
      const priceInRange = parseFloat(model.modeling_price) >= minPrice && parseFloat(model.modeling_price) <= maxPrice;
      return modelNameMatches && priceInRange;
    });
  
    return filteredData;
};
  
export const setModelingAction = (searchValue, minPrice, maxPrice) => async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
  
      const response = await getModelings(searchValue, minPrice, maxPrice);
      const draft_id = response[0];
      const data = response[1];
  
      if (data[0].modeling_image === '/mock.jpg' && data[0].modeling_name === 'Станция Щёлковская') {
        const filteredData = filterModelings(data, searchValue, minPrice, maxPrice);
        dispatch(setModelings(filteredData));
      } else {
        dispatch(setModelings(data));
      }
  
      dispatch(setLoading(false));
  
  
      if (draft_id) {
        dispatch(setDraftId( draft_id ));
      }
  
    } catch (error) {
      console.error('Ошибка получения объектов моделирования:', error);
      dispatch(setLoading(false));
    }
};
  
export const setSearchValueAction = (searchValue) => (dispatch) => {
    dispatch(setSearchValue(searchValue));
};
  
export const setMinPriceAction = (minPrice) => (dispatch) => {
    dispatch(setMinPrice(minPrice));
};
  
export const setMaxPriceAction = (maxPrice) => (dispatch) => {
    dispatch(setMaxPrice(maxPrice));
};
