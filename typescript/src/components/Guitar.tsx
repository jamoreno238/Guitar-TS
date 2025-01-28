import { Fragment } from "react";
import type {Guitar} from '../types/types'


type GuitarProps = { guitar: Guitar; addToCart: (item: Guitar) => void };
export default function Guitar({ guitar, addToCart }: GuitarProps) {
  const { id, name, image, description, price } = guitar;

  //   console.log(guitar);
  return (
    <Fragment>
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
          <img
            className="img-fluid"
            src={`/img/${image}.jpg`}
            alt="imagen guitarra"
          />
        </div>
        <div className="col-8">
          <p className="fw-black text-primary fs-3 ">{id}</p>
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button
            type="button"
            onClick={() => addToCart(guitar)}
            className="btn btn-dark w-100"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </Fragment>
  );
}
