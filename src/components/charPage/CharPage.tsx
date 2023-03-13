import { useEffect } from 'react';
import { useAppSelector,useAppDispatch } from '../../hooks/tsHook'
import { useParams } from 'react-router-dom';
import { fetchChar, setSelectedId } from '../../store/slices/rickAndMortySlice';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import './CharPage.scss'

const back = require('../../resources/img/back.png')

const CharPage:React.FC = () => {

    const dispatch = useAppDispatch();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(setSelectedId(id));
            dispatch(fetchChar(id));
        }
    },[])

    const {selectedChar,loading,error} = useAppSelector(state => state.rickAndMorty);

    const subtitles:Array<string> = ['gender','status','species','origin','type']

    return(
        <>
            <div className='charPage'>
                <Link className='charPage__link' to='/'>
                    <img className='charPage__link-img' src={back}/>
                    <span className='charPage__link-text'>GO BACK</span>
                </Link>
                <div className='charPage__item'>
                    {error ? <Error/> : null}
                    {loading ? <Spinner/> : 
                    <>
                        <img className='charPage__item-img' src={selectedChar?.image}/>
                        <p className='charPage__item-name'>{selectedChar?.name}</p>
                        <div className='charPage__item-info'>
                            <p className='charPage__item-header'>Informations</p>
                            {subtitles.map(item => {
                                let value = selectedChar?.[`${item}`]
                                if (typeof value === 'object' && !Array.isArray(value)) {
                                    value = value.name;
                                }
                                if (value === '') {
                                    value = 'Unknown'
                                }
                                return(
                                    <div key={item} className='charPage__item-block'>
                                        <p className='charPage__item-subtitle'>{item[0].toUpperCase() + item.slice(1)}</p>
                                        <p className='charPage__item-secondaryText'>{value}</p>
                                        <span className='charPage__item-underLine'></span>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    )
}

export default CharPage;