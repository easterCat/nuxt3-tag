import Request from '~~/src/utils/request';

class EhttApi extends Request {
    // https://ehtt.fly.dev/swagger
    getNameSpaceList() {
        return this.get('https://ehtt.fly.dev/database');
    }

    getListByNameSpace() {
        return this.get(
            `https://raw.githubusercontent.com/EhTagTranslation/Database/master/database/female.md`,
        );
    }

    // https://github.com/EhTagTranslation/DatabaseReleases/tree/fd4a5e4ffddaebf8dd526b5d5b349efdd39d7604
    getAllJsonData() {
        return this.get(
            'https://raw.githubusercontent.com/EhTagTranslation/DatabaseReleases/master/db.full.json',
        );
    }
}

export default new EhttApi();
