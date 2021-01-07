import { useState, useEffect } from 'react';
import styled from 'styled-components';
import uid from './uid';
import Highlighter from './highlighter';
import Value from './value';
import Leaves from './leaves';
import ShowMoreArrow from './show_more_icon';
import StyledLeaf from './styled-leaf';
import isPrimitive from './is-primitive';
import inQuery from './in-query';
import type from './type';

const PATH_PREFIX = '.root.';

export default function Leaf({
  data,
  filteredData,
  depth = 0,
  id,
  isAllExpanded,
  label,
  onClick,
  prefix = '',
  query,
  index,
  indexedData,
  setSearchIndex,
  searchIndex,
}) {
  const [expanded, setExpanded] = useState();
  const leafId = `id_${uid()}`;
  const rootPath = _rootPath({ prefix, label });
  const keypath = _keypath({ rootPath });
  const [path, setPath] = useState();
  const [open, setOpen] = useState(false);
  const [filterFields, setFilterFields] = useState(true);
  const [allFields, setAllFields] = useState();
  const [searchId, setSearchId] = useState();

  const d = {
    path: keypath,
    key: label.toString(),
    value: filteredData,
  };

  useEffect(() => {
    setExpanded(false);
    setPath(_path({ rootPath, data, index }));
  }, []);

  useEffect(() => {
    if (filteredData?.index) {
      setSearchIndex(filteredData.index);
    }
  }, [filteredData]);

  useEffect(() => {
    if (searchIndex) {
      setSearchId(searchIndex);
    }
  }, [searchIndex]);

  useEffect(() => {
    setExpanded(isAllExpanded);
    setOpen(isAllExpanded);
  }, [isAllExpanded]);

  function handleClick(e) {
    e.stopPropagation();
    setExpanded((ex) => !ex);
    setOpen((o) => !o);
  }

  return nullCount({ data: filteredData, query, path }) ? (
    <StyledLeaf data={filteredData} id={`leaf-${rootPath}`}>
      <HiddenRadio type='radio' name={id} id={leafId} tabIndex={-1} />
      <Content>
        <LineLabel htmlFor={leafId} onClick={handleClick}>
          <FlatpathLabel>{d.path}</FlatpathLabel>
          {depth !== 0 && (
            <ShowMoreArrow
              isPrimitive={isPrimitive(filteredData)}
              open={open}
            />
          )}
          <Key>
            {d.key === 'root' || !Number.isNaN(parseInt(d.key, 10)) ? (
              ''
            ) : (
              <>
                "<Highlighter string={d.key} highlight={query} />"<span>:</span>
              </>
            )}
          </Key>
          <Value data={filteredData} query={query} path={path} />
        </LineLabel>
        {open && query && (
          <AllFields
            data={data}
            depth={depth}
            filteredData={filteredData}
            filterFields={filterFields}
            index={searchId}
            query={query}
            setAllFields={setAllFields}
            setFilterFields={setFilterFields}
          />
        )}
      </Content>
      <Leaves
        childPrefix={rootPath}
        data={data}
        filteredData={filteredData}
        depth={++depth}
        expanded={expanded}
        id={id}
        isAllExpanded={isAllExpanded}
        onClick={onClick}
        path={path}
        query={query}
        filterFields={filterFields}
        fields={allFields}
        indexedData={indexedData}
        searchIndex={searchIndex}
        setSearchIndex={setSearchIndex}
      />
    </StyledLeaf>
  ) : null;
}

function _rootPath({ prefix, label }) {
  return `${prefix}.${label}`;
}

function _keypath({ rootPath }) {
  return rootPath.substr(PATH_PREFIX.length);
}

function _path({ rootPath, data, index }) {
  return isPrimitive(data)
    ? `${rootPath}.${data}`
    : Array.isArray(data)
    ? `${rootPath}.${index}`
    : rootPath;
}

const HiddenRadio = styled.input`
  display: none;
`;

const FlatpathLabel = styled.label`
  cursor: pointer;
  display: none;
`;

const LineLabel = styled.label`
  display: block;
  position: relative;

  cursor: default;
  &::after {
    content: '';

    position: absolute;
    top: 0;
    left: -200px;
    right: -50px;
    bottom: 0;
    z-index: -1;

    pointer-events: none;

    &:hover:after {
      background: rgba(0, 0, 0, 0.06);
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const Key = styled.span`
  font-weight: 600;
`;

function nullCount({ data, query, path }) {
  const t = type(data);

  switch (t) {
    case 'Array':
    case 'Object':
      return Object.entries(data).filter(inQuery({ query, path })).length > 0;
    default:
      return true;
  }
}

function getData({ data, depth, path }) {
  const paths = path.split('.').slice(1, depth + 1);
  return paths.reduce((agg, property) => agg[property], data);
}

function AllFields({
  data,
  depth,
  filteredData,
  filterFields,
  index,
  query,
  setAllFields,
  setFilterFields,
}) {
  function onClick() {
    setFilterFields((f) => !f);
    setAllFields(getData({ data, depth, path: filteredData?.index || index }));
  }
  return !isPrimitive(filteredData) && query ? (
    <SmallText onClick={onClick}>
      {filterFields ? 'view all fields' : 'show only matching fields'}
    </SmallText>
  ) : null;
}

const SmallText = styled.span`
  margin-left: 10px;
  font-size: 10px;
`;
