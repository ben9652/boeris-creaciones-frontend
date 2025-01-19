import { Component } from '@angular/core';
import { PurchaseCardComponent } from './purchase-card/purchase-card.component';
import { Purchase } from '../../../../core/models/purchase.entities';

@Component({
    selector: 'app-purchases',
    imports: [
        PurchaseCardComponent
    ],
    templateUrl: './purchases.component.html',
    styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {
    purchase1: Purchase;
    purchase2: Purchase;

    constructor() {
        const purchase1: Purchase = {
            id: 1,
            description: "Compra de materiales de construcción",
            requester_partner: {
                id_user: 101,
                username: "jdoe",
                firstName: "John",
                lastName: "Doe",
                email: "jdoe@example.com",
                role: "Manager",
            },
            provider: {
                id: 201,
                name: "Proveedores del Norte",
                residence: "Tucumán, Argentina",
                phone: 3811234567,
                cvu_or_alias: "proveed_norte",
                category: {
                    id: 1,
                    name: "Construcción",
                },
            },
            raw_materials: [
                {
                    raw_material_id: 301,
                    category: { id: 1, name: "Construcción" },
                    name: "Cemento",
                    quantity: 100,
                    unit_price: 500,
                    total: 50000,
                },
                {
                    raw_material_id: 302,
                    category: { id: 1, name: "Construcción" },
                    name: "Ladrillos",
                    quantity: 500,
                    unit_price: 15,
                    total: 7500,
                },
            ],
            order_date: new Date("2025-01-10"),
            reception_date: null,
            canceled_date: null,
            currency: "ARS",
            payment_type: "Transferencia bancaria",
            reception_mode: "Envio",
            reception_branch: null,
            status: 'P',
            price: 57500,
            invoice: null,
        };
        
        const purchase2: Purchase = {
            id: 2,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio rem, architecto vero soluta distinctio ullam at quos totam sed obcaecati quasi quo laboriosam saepe nam, eum esse autem maiores veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio rem, architecto vero soluta distinctio ullam at quos totam sed obcaecati quasi quo laboriosam saepe nam, eum esse autem maiores veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio rem, architecto vero soluta distinctio ullam at quos totam sed obcaecati quasi quo laboriosam saepe nam, eum esse autem maiores veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio rem, architecto vero soluta distinctio ullam at quos totam sed obcaecati quasi quo laboriosam saepe nam, eum esse autem maiores veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio rem, architecto vero soluta distinctio ullam at quos totam sed obcaecati quasi quo laboriosam saepe nam, eum esse autem maiores veniam?",
            requester_partner: {
                id_user: 102,
                username: "maria_smith",
                firstName: "Maria",
                lastName: "Smith",
                email: "msmith@example.com",
                role: "Purchaser",
            },
            provider: {
                id: 202,
                name: "Electrónica Global",
                residence: "Buenos Aires, Argentina",
                phone: 1145678910,
                cvu_or_alias: "electronica_global",
                category: {
                    id: 2,
                    name: "Electrónica",
                },
            },
            raw_materials: [
                {
                    raw_material_id: 401,
                    category: { id: 2, name: "Electrónica" },
                    name: "Placas madre",
                    quantity: 50,
                    unit_price: 15000,
                    total: 750000,
                },
                {
                    raw_material_id: 402,
                    category: { id: 2, name: "Electrónica" },
                    name: "Procesadores",
                    quantity: 30,
                    unit_price: 20000,
                    total: 600000,
                },
            ],
            order_date: new Date("2025-01-15"),
            reception_date: new Date("2025-01-17"),
            canceled_date: null,
            currency: "USD",
            payment_type: "Tarjeta de crédito",
            reception_mode: "Retiro en sucursal",
            reception_branch: {
                id: 1,
                name: "Sucursal Central",
                domicile: "Av. Rivadavia 1234, Buenos Aires",
                locality: {
                    id: 1,
                    name: "CABA",
                    province: {
                    id: 1,
                    name: "Buenos Aires",
                    }
                }
            },
            status: 'R',
            price: 1350000,
            invoice: "INV-2025-0002",
        };

        this.purchase1 = purchase1;
        this.purchase2 = purchase2;
    }
}
