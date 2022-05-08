import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, {useEffect} from 'react';
import './Slider.css'
import SlideNextButton from './SlideNextButton';
import SlidePrevButton from './SlidePrevButton';

// Import Swiper styles
import 'swiper/css';

function Slider () {
    const {paginatedList, loading, error} = useTypedSelector(state => state.titles)
    const {getTitles, setTitlesPage, setCurrentTitleDetails} = useActions()
    

    useEffect(() => {
        getTitles(1, 20)
    }, []);

    if (loading) {
        return <h1>Идет загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }
  
  
    return (
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={3}
        
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
         
    >
       
        <SlidePrevButton/>
        {paginatedList?.items?.map((title) => (
                <SwiperSlide>
                    <div key={title.id} className="card__item">
                        <div className="card__inner">
                            <div  className="card__img">
                                
                                <div className="card__title">{title.russian}</div>
                                <img src={"https://shikimori.one/" + title.image?.preview}/>
                                <div className="card__text">{title.score}</div>
                                
                            </div>
                            
                        </div>
                    </div>
                </SwiperSlide>
            ))}
      
          <SlideNextButton/>      
        
               
    </Swiper>
  );
};

export default Slider