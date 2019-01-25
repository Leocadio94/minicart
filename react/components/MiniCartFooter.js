import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { Button, Spinner } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { MiniCartPropTypes } from '../propTypes'
import minicart from '../minicart.css'

class MiniCartFooter extends PureComponent {
  static propTypes = {
    shippingCost: PropTypes.number,
    large: PropTypes.bool,
    isUpdating: PropTypes.bool,
    totalValue: PropTypes.number.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    showDiscount: MiniCartPropTypes.showDiscount,
    discount: PropTypes.number,
    labelDiscount: PropTypes.string,
    showShippingCost: MiniCartPropTypes.showShippingCost,
  }

  handleClickButton = () => location.assign('/checkout/#/cart')

  render() {
    const { 
      shippingCost, 
      large, 
      isUpdating, 
      totalValue, 
      buttonLabel, 
      showDiscount, 
      discount, 
      labelDiscount,
      showShippingCost
     } = this.props

    const priceAndDiscountClasses = classNames(
      `${minicart.contentDiscount} w-100 flex justify-end items-center mb3`,
      {
        'pv3': large,
      }
    )

    const checkoutButtonClasses = classNames(
      '',
      {
        'bb bw4 bw2-m b--transparent': large,
      }
    )

    const shouldShowShippingCost = showShippingCost && shippingCost > 0

    const footerClasses = classNames(
      `${minicart.contentFooter} w-100 bg-base pa4 pv5 flex flex-column items-end`,
      {
        'bt b--muted-3': shouldShowShippingCost || large,
      }
    )

    return (
      <Fragment>
        {shouldShowShippingCost && (
          <div className="flex w-100 items-center justify-between ph4 pv4">
            <div className="t-body c-muted-1">
              <FormattedMessage id="minicart.shipping-cost" />
            </div>
            <ProductPrice
              sellingPriceClass="t-heading-5-ns b c-on-base ph2 dib"
              sellingPrice={shippingCost}
              showLabels={false}
              showListPrice={false}
            />
          </div>
        )}
        <div className={footerClasses}>
          {showDiscount && discount > 0 && (
            <div className={priceAndDiscountClasses}>
              <span className="ttl c-action-primary">{labelDiscount}</span>
              <ProductPrice
                sellingPriceClass="c-action-primary t-body ph2 dib"
                sellingPrice={discount}
                listPrice={discount}
                showLabels={false}
                showListPrice={false}
              />
            </div>
          )}
          <div className={`${minicart.contentPrice} mb3`}>
            {isUpdating
              ? (<Spinner size={18} />)
              : (
                <ProductPrice
                  sellingPriceClass="t-heading-5-ns c-on-base b ph2 dib"
                  sellingPrice={totalValue}
                  listPrice={totalValue}
                  showLabels={false}
                  showListPrice={false}
                />
              )
            }
          </div>
          <div className={checkoutButtonClasses}>
            <Button
              variation="primary"
              size="small"
              onClick={this.handleClickButton}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default MiniCartFooter
