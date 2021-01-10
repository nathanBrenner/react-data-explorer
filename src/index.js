import { useState, useEffect, memo } from 'react';
import { Leaf, Toolbar } from './components';
import { isPrimitive, filterer } from './utils';

export default memo(ReactDataExplorer);

function ReactDataExplorer({ data = [] }) {
  const [query, setQuery] = useState('');
  const [indexedData, setIndexedData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [isAllExpanded, setAllExpanded] = useState(false);
  const [searchIndex, setSearchIndex] = useState();
  const filterOptions = {
    cacheResults: true,
    ignoreCase: true,
  };

  useEffect(() => {
    const valid = query !== '' && validateQuery(query);
    const d = valid ? filterer(indexedData, filterOptions)(query) : data;
    setFilteredData(d);
    if (valid) {
      setAllExpanded(true);
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      setIndexedData(indexData(data));
    }
  }, [data]);

  return (Array.isArray(indexedData) && indexedData.length > 0) ||
    Object.keys(indexedData).length > 0 ? (
    <div>
      <Toolbar
        onChange={setQuery}
        onAllExpand={setAllExpanded}
        onDownload={() => download(data)}
      />

      <Leaf
        data={indexedData}
        indexedData={indexedData}
        filteredData={filteredData}
        id={`json-${Date.now()}`}
        isAllExpanded={isAllExpanded}
        label='root'
        query={query}
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
      />
    </div>
  ) : (
    'null'
  );
}

function indexData(data, path = 'root') {
  if (Array.isArray(data)) {
    return data.map((d, i) => indexData(d, `${path}.${i}`));
  }

  if (isPrimitive(data)) {
    return data;
  }

  return Object.entries(data).reduce(
    (result, [key, value]) => {
      if (!isPrimitive(value)) {
        return { ...result, [key]: indexData(value, `${path}.${key}`) };
      } else {
        return { ...result, [key]: value };
      }
    },
    { index: path },
  );
}

function validateQuery(q) {
  return q.length >= 2;
}

function download(data) {
  const formattedData = JSON.stringify(data, null, 2);
  const filename = `data.json`;
  const link = document.createElement('a');
  link.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(formattedData)}`,
  );
  link.setAttribute('download', filename);

  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
