
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Button} from "react-bootstrap";

export const Recipes = () =>{
    const { t } = useTranslation();
    const [rows, setRows] = useState([['Doctor', 'Client', 'Ibuprofen', '22/12/2012']]);
    return (
        <div>
            <table>
                <tr>
                    <th>{t("givenBy")}</th>
                    <th>{t("client")}</th>
                    <th>{t("drug")}</th>
                    <th>{t("date")}</th>
                </tr>
                {rows.map((r) => (
                    <tr>
                        <td>{r[0]}</td>
                        <td>{r[1]}</td>
                        <td>{r[2]}</td>
                        <td>{r[3]}</td>
                    </tr>
                ))}
            </table>

        </div>
    );
}

export default Recipes;