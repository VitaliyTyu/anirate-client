import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller, Thumbs } from 'swiper';
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


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);


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
                    navigation
                    pagination
                    scrollbar={{ draggable: true }}
                    slidesPerView={6}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },

                        500: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },

                        800: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        },

                        1150: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        },

                        1600: {
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

                                <AnimeItem
                                    key={title.id}
                                    title={title}
                                    clickFunction={() => navigate(`/animes/${title?.id}`)} />

                            </SwiperSlide>
                        ))}
                    </div>
                    <SlideNextButton />
                    <SlidePrevButton />
                </Swiper >

            </div>
        </div >
    );
};

export default Slider