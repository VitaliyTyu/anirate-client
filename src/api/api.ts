import { ClientBase } from './client-base';
import { setAuthHeader } from "../auth/auth-headers";

export class Client extends ClientBase {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * получить все коллекции с пагинацией
     * @param page (optional) 
     * @param size (optional) 
     * @return Success
     */
    animeCollections(page: number | undefined, size: number | undefined): Promise<BriefCollectionVMPaginatedList> {
        let url_ = this.baseUrl + "/api/AnimeCollections?";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processAnimeCollections(_response);
        });
    }

    protected processAnimeCollections(response: Response): Promise<BriefCollectionVMPaginatedList> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as BriefCollectionVMPaginatedList;
                return result200;
            });
        } else if (status === 401) {
            return response.text().then((_responseText) => {
                return throwException("Unauthorized", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<BriefCollectionVMPaginatedList>(null as any);
    }

    /**
     * получить детали коллекции с пагинацией тайтлов
     * @param id (optional) 
     * @param page (optional) 
     * @param size (optional) 
     * @return Success
     */
    collectionDetails(id: string | undefined, page: number | undefined, size: number | undefined): Promise<CollectionDetailsVM> {
        let url_ = this.baseUrl + "/api/AnimeCollections/CollectionDetails?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processCollectionDetails(_response);
        });
    }

    protected processCollectionDetails(response: Response): Promise<CollectionDetailsVM> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as CollectionDetailsVM;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<CollectionDetailsVM>(null as any);
    }

    /**
     * создать коллекцию со списком аниме (он может быть пустым)
     * @param body (optional)
     * @return Success
     */
    collection(body: CreateCollectionDto | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/AnimeCollections/Collection";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processCollection(_response);
        });
    }

    protected processCollection(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 201) {
            return response.text().then((_responseText) => {
                let result201: any = null;
                result201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as string;
                return result201;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    /**
     * добавить тайтлы в коллекции
     * @param body (optional)
     * @return Success
     */
    titles(body: AddTitlesInCollectionsDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/AnimeCollections/Titles";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processTitles(_response);
        });
    }

    protected processTitles(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 204) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * изменить детали коллекции
     * @param body (optional)
     * @return Success
     */
    changeDetails(body: UpdateCollectionDetailsDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/AnimeCollections/ChangeDetails";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processChangeDetails(_response);
        });
    }

    protected processChangeDetails(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 204) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * удалить коллекции
     * @param body (optional)
     * @return Success
     */
    collections(body: DeleteCollectionsDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/AnimeCollections/Collections";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processCollections(_response);
        });
    }

    protected processCollections(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 204) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * удалить тайтлы из коллекции
     * @param body (optional)
     * @return Success
     */
    manyTitlesFromCollection(body: DeleteManyTitlesFromCollectionDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/AnimeCollections/ManyTitlesFromCollection";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processManyTitlesFromCollection(_response);
        });
    }

    protected processManyTitlesFromCollection(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 204) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * удалить тайтл из коллекций
     * @param body (optional)
     * @return Success
     */
    titleFromManyCollections(body: DeleteTitleFromManyCollectionsDto | undefined): Promise<void> {
        let url_ = this.baseUrl + "/api/AnimeCollections/TitleFromManyCollections";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processTitleFromManyCollections(_response);
        });
    }

    protected processTitleFromManyCollections(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 204) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * Получение всех аниме с пагинацией
     * @param pageNumber (optional)
     * @param pageSize (optional)
     * @return Success
     */
    animeTitles(pageNumber: number | undefined, pageSize: number | undefined): Promise<BriefTitleVMPaginatedList> {
        let url_ = this.baseUrl + "/api/AnimeTitles?";
        if (pageNumber === null)
            throw new Error("The parameter 'pageNumber' cannot be null.");
        else if (pageNumber !== undefined)
            url_ += "PageNumber=" + encodeURIComponent("" + pageNumber) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "PageSize=" + encodeURIComponent("" + pageSize) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAnimeTitles(_response);
        });
    }

    protected processAnimeTitles(response: Response): Promise<BriefTitleVMPaginatedList> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as BriefTitleVMPaginatedList;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<BriefTitleVMPaginatedList>(null as any);
    }

    /**
     * Получение деталей определенного аниме
     * @return Success
     */
    animeTitleDetails(id: string): Promise<TitleDetailsVM> {
        let url_ = this.baseUrl + "/api/AnimeTitles/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processanimeTitleDetails(_response);
        });
    }

    protected processanimeTitleDetails(response: Response): Promise<TitleDetailsVM> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as TitleDetailsVM;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<TitleDetailsVM>(null as any);
    }

    /**
      * Получение всех аниме в конкретной коллекции с пагинацией аниме
      * @param collectionId (optional) 
      * @param page (optional) 
      * @param size (optional) 
      * @return Success
      */
    titlesFromCollection(collectionId: string | undefined, page: number | undefined, size: number | undefined): Promise<BriefTitleVMPaginatedList> {
        let url_ = this.baseUrl + "/api/AnimeTitles/TitlesFromCollection?";
        if (collectionId === null)
            throw new Error("The parameter 'collectionId' cannot be null.");
        else if (collectionId !== undefined)
            url_ += "collectionId=" + encodeURIComponent("" + collectionId) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (size === null)
            throw new Error("The parameter 'size' cannot be null.");
        else if (size !== undefined)
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processTitlesFromCollection(_response);
        });
    }

    protected processTitlesFromCollection(response: Response): Promise<BriefTitleVMPaginatedList> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as BriefTitleVMPaginatedList;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<BriefTitleVMPaginatedList>(null as any);
    }


    /**
     * Логин
     * @param body (optional) 
     * @return Success
     */
    login(body: LoginViewModel | undefined): Promise<UserInfo> {
        let url_ = this.baseUrl + "/api/Auth/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processLogin(_response);
        });
    }

    protected processLogin(response: Response): Promise<UserInfo> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as UserInfo;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserInfo>(null as any);
    }


    /**
     * Регистрация
     * @param body (optional) 
     * @return Success
     */
    register(body: RegisterViewModel | undefined): Promise<UserInfo> {
        let url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processRegister(_response);
        });
    }

    protected processRegister(response: Response): Promise<UserInfo> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as UserInfo;
                return result200;
            });
        } else if (status === 409) {
            return response.text().then((_responseText) => {
                return throwException("Адрес электронной почты занят", status, _responseText, _headers);
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserInfo>(null as any);
    }


    /**
     * Проверка на авторизованность
     * @return Success
     */
    check(): Promise<void> {
        let url_ = this.baseUrl + "/api/Auth/check";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processCheck(_response);
        });
    }

    protected processCheck(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }
}



export interface UserInfo {
    token?: string | undefined;
    userName?: string | undefined;
    errorMessage?: string | undefined;
}

export interface AddTitlesInCollectionsDto {
    collectionsIds?: string[] | undefined;
    animeTitlesIds?: string[] | undefined;
}

export interface AnimeCollection {
    userId?: string;
    id?: string;
    name?: string | undefined;
    userComment?: string | undefined;
    userRating?: number | undefined;
    image?: Image;
    animeTitles?: AnimeTitle[] | undefined;
}

export interface AnimeTitle {
    id?: string;
    userComment?: string | undefined;
    userRating?: number | undefined;
    name?: string | undefined;
    russian?: string | undefined;
    score?: string | undefined;
    episodes?: number | undefined;
    aired_on?: string | undefined;
    released_on?: string | undefined;
    description?: string | undefined;
    description_html?: string | undefined;
    image?: Image;
    genres?: Genre[] | undefined;
    animeCollections?: AnimeCollection[] | undefined;
}

export interface BriefCollectionVM {
    id?: string;
    name?: string | undefined;
    image?: Image;
}

export interface BriefCollectionVMPaginatedList {
    items?: BriefCollectionVM[] | undefined;
    pageNumber?: number;
    readonly totalPages?: number;
    readonly totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
}

export interface BriefTitleVM {
    id?: string;
    name?: string | undefined;
    russian?: string | undefined;
    score?: string | undefined;
    image?: Image;
}

export interface BriefTitleVMPaginatedList {
    items?: BriefTitleVM[] | undefined;
    pageNumber?: number;
    readonly totalPages?: number;
    readonly totalCount?: number;
    readonly hasPreviousPage?: boolean;
    readonly hasNextPage?: boolean;
}

export interface CollectionDetailsVM {
    id?: string;
    name?: string | undefined;
    userComment?: string | undefined;
    userRating?: number | undefined;
    image?: Image;
    animeTitles?: BriefTitleVMPaginatedList;
}

export interface CreateCollectionDto {
    name?: string | undefined;
    animeTitlesIds?: string[] | undefined;
}

export interface DeleteCollectionsDto {
    animeCollectionsIds?: string[] | undefined;
}

export interface DeleteManyTitlesFromCollectionDto {
    id?: string;
    animeTitlesIds?: string[] | undefined;
}

export interface DeleteTitleFromManyCollectionsDto {
    titleId?: string;
    collectionsIds?: string[] | undefined;
}

export interface Genre {
    id?: string;
    animeId?: string;
    animeTitle?: AnimeTitle;
    name?: string | undefined;
    russian?: string | undefined;
}

export interface Image {
    id?: string;
    animeId?: string;
    animeTitle?: AnimeTitle;
    original?: string | undefined;
    preview?: string | undefined;
    x96?: string | undefined;
    x48?: string | undefined;
}

export interface LoginViewModel {
    emailAddress: string;
    password: string;
}

export interface RegisterViewModel {
    name: string;
    emailAddress: string;
    password: string;
    confirmPassword: string;
}

export interface TitleDetailsVM {
    id?: string;
    name?: string | undefined;
    russian?: string | undefined;
    score?: string | undefined;
    episodes?: number | undefined;
    airedOn?: string | undefined;
    releasedOn?: string | undefined;
    description?: string | undefined;
    descriptionHtml?: string | undefined;
    image?: Image;
    genres?: Genre[] | undefined;
    userComment?: string | undefined;
    userRating?: number | undefined;
    animeCollections?: AnimeCollection[] | undefined;
}

export interface TitlesListVM {
    animeTitles?: BriefTitleVM[] | undefined;
}

export interface UpdateCollectionDetailsDto {
    id?: string;
    name?: string | undefined;
    userComment?: string | undefined;
    userRating?: number | undefined;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}