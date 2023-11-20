import * as React from 'react'
import { useEffect, useRef } from 'react';


    export function authTest() {
        let token = localStorage.getItem('access');
        if (token) {
            let jwt: any = atob(token.split(".")[1])
            let expiredate = new Date(jwt.exp)
            if (expiredate > new Date()) {
                return true;
            }
        }
        return false;
    }

