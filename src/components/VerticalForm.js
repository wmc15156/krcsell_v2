// @flow
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type VerticalFromProps = {
    defaultValues?: Object,
    resolver?: any,
    children?: any,
    onSubmit?: (value: any) => void,
    formClass?: string,
};

const VerticalForm = ({ resolver, children, onSubmit, formClass }: VerticalFromProps): React$Element<any> => {
    /*
     * form methods
     */
    const methods = useForm({ resolver });
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = methods;

    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate style={{ zIndex: -1 }}>
            {Array.isArray(children)
                ? children.map((child) => {
                      return child.props && child.props.name
                          ? React.createElement(child.type, {
                                ...{
                                    ...child.props,
                                    register,
                                    key: child.props.name,
                                    errors,
                                    control,
                                },
                            })
                          : child;
                  })
                : children}
        </form>
    );
};

export default VerticalForm;
