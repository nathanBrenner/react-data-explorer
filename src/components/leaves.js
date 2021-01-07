import isPrimitive from './is-primitive';
import inQuery from './in-query';
import leafKey from './leaf-key';
import Leaf from './leaf';

export default function Leaves({
  childPrefix,
  data,
  filteredData,
  depth,
  expanded,
  id,
  isAllExpanded,
  onClick,
  path,
  query,
  filterFields = true,
  fields = {},
  indexedData,
  searchIndex,
  setSearchIndex,
}) {
  if ((depth < 2 || expanded) && !isPrimitive(filteredData)) {
    const entries = Object.entries(filteredData).filter(
      inQuery({ query, path }),
    );
    const unfiltered = Object.entries(fields).filter(
      ([key]) => key !== 'index',
    );

    return (filterFields ? entries : unfiltered).map(([key, value], i) => {
      return (
        <Leaf
          data={data}
          filteredData={value}
          depth={depth}
          id={id}
          isAllExpanded={isAllExpanded}
          key={leafKey(key, value)}
          label={key}
          onClick={onClick}
          prefix={childPrefix}
          query={query}
          index={i}
          indexedData={indexedData}
          searchIndex={searchIndex}
          setSearchIndex={setSearchIndex}
        />
      );
    });
  }
  return null;
}
