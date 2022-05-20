import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import css from './Slider.module.css'
import SlideNextButton from './SlideNextButton';
import SlidePrevButton from './SlidePrevButton';

// Import Swiper styles
import 'swiper/css';
import { Link, useNavigate } from 'react-router-dom';
import AnimeItem from '../AnimeItem/AnimeItem';

const Slider: FC = (): ReactElement => {
    const { paginatedList, loading, error } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, setCurrentTitleDetails } = useActions()
    const navigate = useNavigate()

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
        <div className={css.intro}>
            <h1>ПОПУЛЯРНЫЕ АНИМЕ</h1>
            <div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={40}
                slidesPerView={5}
                breakpoints = {{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                      },
                    
                    580: {
                      slidesPerView: 2,
                      spaceBetween: 20
                    },
                    
                    880: {
                      slidesPerView: 3,
                      spaceBetween: 30
                    },
                    
                    1150: {
                      slidesPerView: 4,
                      spaceBetween: 40
                    },
                    
                    1800: {
                        slidesPerView: 5,
                        spaceBetween: 50
                      }
                }}
                loop={true}
                autoplay={{delay: 2000, disableOnInteraction: false}}
            >
                <div className={css.swiper}>
                    {paginatedList?.items?.map((title) => (
                        <SwiperSlide>
                            <div
                                key={title.id}
                                
                                onClick={() => setCurrentTitleDetails(title.id)}
                            >
                                <AnimeItem title={title} clickFunction={() => navigate(`/animes/${title?.id}`)} />
                                {/* <Link to="/title">

                                    <div className={css.card__inner}>
                                        <div className={css.card__img}>
                                            <div className={css.card__name} >{index + 1}</div>
                                            <img src={"https://shikimori.one/" + title.image?.original} />
                                            <div className={css.card__text}>{title.russian} и его счет {title.score} а его номер {index + 1}</div>
                                        </div>
                                    </div>
                                </Link> */}

                            </div>
                        </SwiperSlide>
                    ))}
                </div>           
            </Swiper >
            </div>
        </div >
    );
};

export default Slider