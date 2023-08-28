import {CSSProperties, default as React} from 'react';

import useDebounce from "./useDebounce";
import List from "./List";
import {DropDownComponent} from "./DropDownComponent";

const {
    applicationID, searchOnlyAPIKey, index_name
} = env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, searchOnlyAPIKey);

const FindComponent = () => {
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [hits, setHits] = React.useState<Array<any>>([]);
    const [locationsArr, setLocationsArr] = React.useState<Array<any>>([]);
    const [facets, setFacets] = React.useState<any>({});

    const [currentAlgoliaIndex, setCurrentAlgoliaIndex] = React.useState(client.initIndex(index_name));

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const searchHandler = ({target}: any) => {
        setSearchTerm(target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setSearchTerm('');
            setHits([]);
        }
    };

    React.useEffect(() => {
        currentAlgoliaIndex.search('', {
            hitsPerPage: 0,
            facets: ["*"]
        })
            .then(({facets, nbHits}: any) => {
                setFacets(facets);
            });
    }, []);

    React.useEffect(() => {
        currentAlgoliaIndex.search(debouncedSearchTerm, {
            facets: ["*"]
        })
            .then(({hits, facets}: any) => {
                if (debouncedSearchTerm.length) {
                    setHits(hits);
                }
            });
    }, [debouncedSearchTerm]);

    return (
        <>
            <div className="filter-panel">

            </div>
            <input autoFocus onInput={searchHandler} onChange={keysHandler} type="text" value={searchTerm} id="input" placeholder="Фамилия, Имя, Отчество"/>
            <List hits={hits} />
        </>
    );
};

export default FindComponent;