import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector,useAppDispatch } from '../../hooks/tsHook'
import { setSelectedId } from '../../store/slices/rickAndMortySlice'
import { fetchChars } from '../../store/slices/rickAndMortySlice'
import { removeUser } from '../../store/slices/userSlice'
import { useAuth } from '../../hooks/authHook'
import { useNavigate } from 'react-router-dom'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import './CharsPage.scss'


const banner = require('../../resources/img/rickAndMortyBanner.png')

const CharsPage:React.FC = () => {


    const dispatch = useAppDispatch();
    
    const [page,setPage] = useState(1);
    const [inputValue,setInputValue] = useState('');

    const {chars,loading,error} = useAppSelector(state => state.rickAndMorty)

    const {isAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
        else if (!chars.length) {
            dispatch(fetchChars(page));   
        }
    },[dispatch])

    const logOut = () => {
        dispatch(removeUser());
        navigate('/login');
    }

    const inputChange = (value:string) => {
        setInputValue(value);
    }

    const loadMore = () => {
        setPage(page => page + 1);
        dispatch(fetchChars(page + 1));
    }

    return(
        <>
            <div className="charsPage">
                <div>
                    <button className='charsPage__logout-btn button' onClick={logOut}>
                        Log out
                    </button>
                    <div className='charsPage__block'>
                        <img className='charsPage__img' src={banner} alt='banner'/>
                    </div>
                    <input value={inputValue} className='charsPage__search' placeholder='Filter by name...' onChange={(e) => inputChange(e.target.value)}/>
                    <div className='charsPage__list'>
                        {loading ? <Spinner/> : null}
                        {error ? <Error/> : null}
                        {chars
                        .filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
                        .map((char) => (
                            <Link to={`/char/${char.id}`} key={char.id} onClick={() => dispatch(setSelectedId(char.id))}>
                                <div className='charsPage__item'>
                                    <img src={char.image} className='charsPage__item-img' alt='char'/>
                                    <div className='charsPage__item-text'>
                                        <p className='charsPage__item-name'>{char.name.length < 20 ? char.name : char.name.slice(0,20) + "..."}</p>
                                        <p className='charsPage__item-race'>{char.species}</p>
                                    </div>
                                </div>    
                            </Link> 
                        ))}
                    </div>
                    {!loading && !error && page !== 42 ? <button onClick={loadMore} className='charsPage__list-button button'>Load More</button> : null}
                </div>
            </div>
        </>

    )
}

export default CharsPage;