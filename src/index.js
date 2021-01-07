import React, { useState, useEffect } from 'react';
import { Leaf, filterer, Toolbar } from './components';
import isPrimitive from './components/is-primitive';

export default React.memo(ReactDataExplorer);

function ReactDataExplorer({ data = [] }) {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [isAllExpanded, setAllExpanded] = useState(false);
  const [indexedData, setIndexedData] = useState([]);
  const filterOptions = {
    cacheResults: true,
    ignoreCase: true,
  };
  const [searchIndex, setSearchIndex] = useState();

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
  console.log(data);

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

const mockData = [
  {
    latest_version: '4.13-beta-3',
    org: 'junit',
    name: 'junit',
    type: 'maven',
    package: 'jar',
    version: '4.13.1',
    scope: 'test',
    requirement: '4.13.1',
    file: 'pom.xml',
    dependencies: null,
  },
  {
    dependencies: null,
    file: 'package.json',
    latest_version: '2.1.4',
    name: 'benchmark',
    org: 'bestiejs',
    package: 'package',
    requirement: '1.x.x',
    scope: 'runtime',
    type: 'npmjs',
    version: '1.0.0',
  },
  {
    latest_version: '1.0.0-beta.5.2',
    org: 'szmarczak',
    name: 'http2-wrapper',
    type: 'npmjs',
    package: 'package',
    version: '1.0.0-beta.5.2',
    scope: 'runtime',
    requirement: '^1.0.0-beta.5.2',
    file: 'package.json',
    dependencies: [
      {
        latest_version: '5.1.1',
        org: 'sindresorhus',
        name: 'quick-lru',
        type: 'npmjs',
        package: 'package',
        version: '5.1.1',
        scope: 'runtime',
        requirement: '^5.1.1',
        file: '',
        dependencies: [],
      },
    ],
  },
];
