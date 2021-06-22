import React from 'react';

export const playListSorter = ({ name: aName }, { name: bName }) =>
  aName.localeCompare(bName, 'en');

const useSorter = (items = [], sorter = playListSorter) => {
  const [sortedItems, setSortedItems] = React.useState(items);

  const sortPlaylist = React.useCallback(() => {
    const sorted = [...items];
    sorted.sort(sorter);
    return sorted;
  }, [items]);

  React.useEffect(() => {
    const sorted = sortPlaylist(items);
    setSortedItems(sorted);
  }, [items]);

  return sortedItems;
};

export default useSorter;
