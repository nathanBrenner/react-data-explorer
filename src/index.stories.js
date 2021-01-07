import ReactDataExplorer from './index';

export default {
  title: 'ReactDataExplorer',
  component: ReactDataExplorer,
  argTypes: {},
};

const Template = (args) => <ReactDataExplorer {...args} />;

export const Init = Template.bind({});

export const WithData = Template.bind({});
WithData.args = {
  data: [],
};

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
