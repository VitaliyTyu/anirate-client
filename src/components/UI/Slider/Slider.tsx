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
import AnimeItem from '../Anime/AnimeItem/AnimeItem';

const Slider: FC = (): ReactElement => {
    const { paginatedList, loading, error } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage } = useActions()
    const navigate = useNavigate()

    useEffect(() => {
        getTitles(1, 50)
    }, []);

    // if (loading) {
    //     return <h1>Идет загрузка...</h1>
    // }

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
                    breakpoints={{
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
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                >
                    <div className={css.swiper}>
                        {paginatedList?.items?.map((title) => (
                            <SwiperSlide>
                                <div
                                    key={title.id}
                                    onClick={() => navigate(`/animes/${title?.id}`)}
                                >
                                    <AnimeItem
                                        key={title.id}
                                        title={title}
                                        clickFunction={() => navigate(`/animes/${title?.id}`)} />
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