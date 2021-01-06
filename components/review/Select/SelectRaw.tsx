import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { IRecoilId, IWithClassName } from '../../../interfaces';
import { IProduct } from '../../../proxies/IProduct';
import { useFlowRouter, useRoutingInfo } from '../../../routing';
import {
  stateCachedProducts,
  stateProductId,
  stateTracking,
} from '../../../states';

export const SelectRaw = ({ className }: IWithClassName) => {
  const router = useFlowRouter();
  const { id, journey } = useRoutingInfo();
  const key: IRecoilId = {
    id,
    journey,
  };
  const [productId, setProductId] = useRecoilState(stateProductId(key));
  const setTracking = useSetRecoilState(stateTracking(journey));
  const products = useRecoilValue<IProduct[]>(stateCachedProducts);

  useEffect(() => {
    setTracking((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, [id]);

  return (
    <div className={className}>
      <h1 className="title">Select Product</h1>
      <div className="options">
        {products.map((p) => (
          <div
            key={p.id}
            className={p.id === productId ? `prod selected` : 'prod'}
            onClick={() => setProductId(p.id)}
          >
            {p.title}
          </div>
        ))}
      </div>
      <div className="next" onClick={() => router.pushStage('reviewer')}>
        Next
      </div>
    </div>
  );
};
