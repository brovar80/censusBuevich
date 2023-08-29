import {default as React} from 'react';
import IconInfo from '../icons/info-tooltip.svg';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const List: React.FC<any> = ({hits}: any) => {

    return (
        <>
            {
                hits.length ? <table className="table table-striped">
                        <thead className="desktop-version">
                        <tr>
                            <th>ФИО</th>
                            <th>Нас.пункт</th>
                            <th>Всего душ</th>
                            <th>Мужчин</th>
                            <th>Женщин</th>
                            <th>Национальность</th>
                            <th>год</th>
                            <th>Заметки</th>
                        </tr>
                        </thead>
                        <tbody id="list-of-res">
                        {
                            hits.sort((a: any, b: any) => a.fio.localeCompare(b.fio)).map((hits: any, index: number) => {
                                const {delo, page, nmbList, okrug, raion, selsovet, place, nmb, fio, nationality, m, f, total, notes, _highlightResult} = hits;
                                const fod = `НАРБ 30-2-${delo}`;
                                const placeTooltipDescription = `${selsovet} сельсовет, ${raion} район, ${okrug} округ`;

const infoMobile = `
Всего душ: ${total};
${!~m.toString().indexOf('-') ? `Мужчин: ${m};` : ''}
${!~f.toString().indexOf('-') ? `Женщин: ${f};` : ''}
${nationality ? `Нацианальность: ${nationality};` : ''}
`;

                                return (
                                    <tr key={index} className="born-item">
                                        <td className="born-name-tr">
                                            <i className="mobile-version">ФИО: </i>
                                            <span dangerouslySetInnerHTML={{__html: _highlightResult?.fio?.value}} />
                                        </td>
                                        <td className="td-place-location">

                                            <OverlayTrigger
                                                placement={'right'}
                                                overlay={<Tooltip id={`tooltip-rigth`}>{placeTooltipDescription}</Tooltip>}
                                            >
                                                <span>
                                                    <span>{place}</span>
                                                    <svg id="Layer_1"
                                                         data-name="Layer 1"
                                                         style={{width: '2px', marginLeft: '5px'}}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.96 122.88">
                                                        <path className="cls-1"
                                                              d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/>
                                                    </svg>
                                                </span>
                                            </OverlayTrigger>

                                        </td>
                                        <td className="mobile-version">
                                            <OverlayTrigger
                                                placement={'auto'}
                                                overlay={<Tooltip id={`tooltip-left`}>{infoMobile}</Tooltip>}
                                            >
                                                <img title={infoMobile} alt={infoMobile} src={IconInfo}/>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="desktop-version">{total}</td>
                                        <td className="desktop-version">{f}</td>
                                        <td className="desktop-version">{m}</td>
                                        <td className="desktop-version">{nationality}</td>
                                        <td>
                                            <OverlayTrigger
                                                placement={'auto'}
                                                overlay={<Tooltip id={`tooltip-rigth`}>{`${fod}, лл. ${page}`}</Tooltip>}
                                            >
                                                <span className="year">
                                                    <span>1926</span>
                                                    <svg id="Layer_1"
                                                         data-name="Layer 1"
                                                         style={{width: '2px', marginLeft: '5px'}}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.96 122.88">
                                                        <path className="cls-1"
                                                              d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/>
                                                    </svg>
                                                </span>
                                            </OverlayTrigger>
                                        </td>
                                        <td className="note-info">{
                                            notes ?
                                                <OverlayTrigger
                                                    placement={'left'}
                                                    overlay={<Tooltip id={`tooltip-left`}>{notes}</Tooltip>}
                                                >
                                                    <img title={notes} alt={notes} src={IconInfo}/>
                                                </OverlayTrigger>
                                                : null
                                        }</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    : null
            }

        </>
    );

};

export default List;