import { exec } from 'child_process';
import { PluginOption } from 'vite';

function execAsync(command: string) {
  return new Promise<string>((res) => {
    exec(command, (_err, stdout) => {
      res(stdout);
    });
  });
}

function getCommits() {
  return execAsync('git rev-list --count HEAD');
}

export const versioning = (
  owner: string,
  repo: string,
  sha: string,
  resolve: (version: number) => string
): PluginOption => {
  return {
    name: 'VersioningPlugin',
    enforce: 'post',
    async generateBundle(options, bundle) {
      const indexHtml = bundle['index.html'];
      if (indexHtml.type === 'asset') {
        const data = await getCommits();
        const version = resolve(+data);
        console.log('\n\n', version, '\n\n');

        indexHtml.source = indexHtml.source
          .toString()
          .replace(/version="(.*?)"/gm, `version="${version}"`);
      }
    },
  };
};
