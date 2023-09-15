import * as yup from "yup";

export const useYupSchemas = () => {
    // REGISTER SCHEMA
    const register = yup.object({
        name: yup.string().required("Vui lòng điền họ tên của bạn"),
        email: yup
            .string()
            .required("Vui lòng điền email")
            .email("Địa chỉ email không hợp lệ"),
        password: yup
            .string()
            .required("Vui lòng nhập mật khẩu")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(16, "Mật khẩu phải có nhiều nhất 16 kí tự")
            .matches(
                /(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])/,
                "Mật khẩu phải có ít nhất một ký tự in hoa và một ký tự thường",
            )
            .matches(
                /(?=.*[@#$%^&-+=()])/,
                "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
            ),
        password_confirmation: yup
            .string()
            .required("Vui lòng nhập lại mật khẩu")
            .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
    });

    const adminCreateUser = yup.object({
        name: yup.string().required("Vui lòng điền họ tên"),
        email: yup
            .string()
            .required("Vui lòng điền email")
            .email("Địa chỉ email không hợp lệ"),
        password: yup
            .string()
            .required("Vui lòng nhập mật khẩu")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(16, "Mật khẩu phải có nhiều nhất 16 kí tự")
            .matches(
                /(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])/,
                "Mật khẩu phải có ít nhất một ký tự in hoa và một ký tự thường",
            )
            .matches(
                /(?=.*[@#$%^&-+=()])/,
                "Mật khẩu phải có ít nhất 1 ký tự đặc biệt",
            ),
        avatar: yup.string(),
    });

    const adminCreateRole = yup.object({
        name: yup.string().required('Vui lòng điền thông tin'),
    })

    const adminCreatePermission = yup.object({
        name: yup.string().required('Vui lòng điền thông tin'),
        description: yup.string().required('Vui lòng điền thông tin')
    })
    return {register, adminCreateUser, adminCreateRole, adminCreatePermission};
};
