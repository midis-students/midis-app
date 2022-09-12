import React from 'react';
import View from '../../../../components/View';
import { Api } from '../../../../lib/api';

import IconFolder from '../../../../assets/folder.svg';
import IconFile from '../../../../assets/file.svg';
import IconLeft from '../../../../assets/left.svg';
import IconFolderMove from '../../../../assets/folder-move.svg';

interface FileElement {
  name: string;
  isDir: boolean;
}

import style from './style.module.scss';
import Div from '../../../../components/Div';
import ReactMarkdown from 'react-markdown';

export default function ObsidianView() {
  const [files, setFiles] = React.useState<FileElement[]>([]);
  const [path, setPath] = React.useState('');
  const [data, setData] = React.useState('');

  const getdata = async () => {
    const response = await Api.obsidian(path);
    if (response.raw) {
      setData(response.data);
      setFiles([]);
    } else {
      const { dirs, files } = response.data as { dirs: string[]; files: string[] };
      const elements: FileElement[] = [];
      dirs.forEach((dir) => {
        elements.push({
          name: dir,
          isDir: true,
        });
      });
      files.forEach((file) => {
        elements.push({
          name: file,
          isDir: false,
        });
      });
      setData('');
      setFiles(elements);
    }
  };

  const onClick = (element: FileElement | undefined = undefined) => {
    if (element === undefined) {
      const paths = path.split('/');
      paths.pop();
      setPath(paths.join('/'));
    } else {
      setPath(path + '/' + element.name);
    }
  };

  React.useEffect(() => {
    console.log(path);
    getdata();
  }, [path]);

  return (
    <View>
      {data != '' && (
        <>
          <Div className={style.header}>
            <div className={style.element} onClick={() => onClick()}>
              <img src={IconLeft} />
              <span>{path}</span>
            </div>
          </Div>
          <Div>
            <ReactMarkdown className={style.md}>{data}</ReactMarkdown>
          </Div>
        </>
      )}
      {files.length > 0 && (
        <Div>
          <ul className={style.container}>
            <li className={style.element} onClick={() => onClick()}>
              <img src={IconFolderMove} />
              <span>..{path}</span>
            </li>
            {files.map((element, i) => (
              <li
                key={element.name + '-' + i}
                className={style.element}
                onClick={() => onClick(element)}>
                <img src={element.isDir ? IconFolder : IconFile} />
                <span>{element.name}</span>
              </li>
            ))}
          </ul>
        </Div>
      )}
    </View>
  );
}
