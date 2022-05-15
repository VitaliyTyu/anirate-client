import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import css from './Slider.module.css'
import SlideNextButton from './SlideNextButton';
import SlidePrevButton from './SlidePrevButton';

// Import Swiper styles
import 'swiper/css';
import { Link } from 'react-router-dom';

const Slider: FC = (): ReactElement => {
    const { paginatedList, loading, error } = useTypedSelector(state => state.titles)
    const { getTitles, setTitlesPage, setCurrentTitleDetails } = useActions()


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
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={40}

                slidesPerView={3}
                loop={true}
            >
                <div className={css.card}>
                    {paginatedList?.items?.map((title, index) => (
                        <SwiperSlide>
                            <div
                                key={title.id}
                                className={css.card__item}
                                onClick={() => setCurrentTitleDetails(title.id)}
                            >
                                <Link to="/title">

                                    <div className={css.card__inner}>
                                        <div className={css.card__img}>
                                            <div className={css.card__name} >{index + 1}</div>
                                            <img src={"https://shikimori.one/" + title.image?.original} />
                                            <div className={css.card__text}>{title.russian} и его счет {title.score} а его номер {index + 1}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}

                </div>

                <div className={css.sliderButton}>
                    <SlidePrevButton />
                    <SlideNextButton />
                </div>
            </Swiper >
        </div >
    );
};

export default Slider