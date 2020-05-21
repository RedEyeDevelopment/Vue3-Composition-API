import { ref, computed } from '@vue/composition-api';
import orderBy from 'lodash.orderby';

export default elements => {
  const orderKey = ref('name');
  const orderedElements = computed(() => orderBy(elements.value, orderKey.value));
  const setOrderKey = key => {
    orderKey.value = key;
  };

  return { orderKey, setOrderKey, orderedElements};
}