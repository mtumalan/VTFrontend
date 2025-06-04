/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Slider from "react-slick";
import { useEffect, useState } from "react";

function NextArrow({ onClick }) {
    return <button className="slide-arrow fugu--arrow" onClick={onClick}></button>;
}

function PrevArrow({ onClick }) {
    return <button className="slide-arrow prev-arrow" onClick={onClick}></button>;
}

export default function CardSliderOne() {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockModels = [
            {
                id: 1,
                name: "ResNet50",
                description: "A deep residual network for image classification.",
                num_classes: 1000,
                input_size: 224,
                weights: "/media/weights/resnet50.pth",
                added_at: "2025-06-01T12:00:00Z",
            },
            {
                id: 2,
                name: "MobileNetV2",
                description: "Efficient model for mobile and embedded vision applications.",
                num_classes: 1000,
                input_size: 224,
                weights: "/media/weights/mobilenetv2.pth",
                added_at: "2025-06-02T09:30:00Z",
            },
            {
                id: 3,
                name: "CustomClassifier",
                description: "A custom model for binary classification tasks.",
                num_classes: 2,
                input_size: 224,
                weights: "/media/weights/customclassifier.pth",
                added_at: "2025-06-03T08:15:00Z",
            },
            {
                id: 4,
                name: "DenseNet121",
                description: "A densely connected convolutional network.",
                num_classes: 1000,
                input_size: 224,
                weights: "/media/weights/densenet121.pth",
                added_at: "2025-06-03T10:00:00Z",
            },
            {
                id: 5,
                name: "EfficientNetB0",
                description: "A highly efficient model for image classification.",
                num_classes: 1000,
                input_size: 224,
                weights: "/media/weights/efficientnetb0.pth",
                added_at: "2025-06-03T11:00:00Z",
            },
            {
                id: 6,
                name: "VGG16",
                description: "A classic deep convolutional network.",
                num_classes: 1000,
                input_size: 224,
                weights: "/media/weights/vgg16.pth",
                added_at: "2025-06-03T12:00:00Z",
            },
            {
                id: 7,
                name: "AlexNet",
                description: "One of the first deep convolutional networks.",
                num_classes: 1000,
                input_size: 224,
                weights: "/media/weights/alexnet.pth",
                added_at: "2025-06-03T13:00:00Z",
            },
        ];
        setModels(mockModels);
        setLoading(false);
    }, []);

    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        autoplay: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className="fugu--slider-section">
            <div className="container">
                <div className="fugu--section-title">
                    <div className="fugu--default-content content-sm">
                        <h2>Our available models</h2>
                    </div>
                </div>
                <div className="fugu--slider-one">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Slider {...settings}>
                            {models.map((model) => (
                                <div className="fugu--card-wrap" key={model.id}>
                                    <div className="fugu--card-thumb">
                                        <img src="/images/all-img/v3/card1.jpg" alt={model.name} />
                                    </div>
                                    <div className="fugu--card-data">
                                        <h3>{model.name}</h3>
                                        <p>{model.description}</p>
                                        <div className="fugu--card-footer">
                                            <div className="fugu--card-footer-data">
                                                <span>Classes:</span>
                                                <h4>{model.num_classes}</h4>
                                            </div>
                                            <Link href={`/models/${model.id}`} legacyBehavior>
                                                <a className="fugu--btn btn-sm bg-white">View details</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>
            </div>
            <div className="fugu--shape1">
                <img src="/images/shape2/shape1.png" alt="" />
            </div>
        </div>
    );
}